<?php

namespace App\Controller;

use App\Document\Step;
use App\Repository\TestRepository;
use DateTime;
use Doctrine\ODM\MongoDB\LockException;
use JMS\Serializer\Serializer;
use function json_last_error_msg;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Document\Test;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class TestController extends Controller
{
    /**
     *
     * @Route("/api/test", name="post_test", methods={"POST"})
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param TestRepository $repository
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function post_test(Request $request, TestRepository $repository)
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || empty($data)) {
            return $this->msg(JsonResponse::HTTP_NOT_ACCEPTABLE, 'content is malformed: ' . json_last_error_msg());
        }

        if(!isset($data['uuid'])) {
            return $this->msg(JsonResponse::HTTP_NOT_ACCEPTABLE, 'uuid is required.');
        }

        $uuid = trim($data['uuid']);

        $test = new Test();
        $test->setUuid($uuid);
        $test->setEmail($data['email']);
        $test->setFirstname($data['firstname']);
        $test->setLastname($data['lastname']);

        $steps = [];
        foreach ($data['questions'] as $question => $answer) {
            $steps[] = new Step($question, $answer);
        }
        $test->setSteps($steps);

        $result = $repository->findOneBy(['uuid' => $uuid]);
        if($result) {
            try {
                $test->setId($result->getId());
                $test->setCreateDate($result->getCreateDate());
                $test->setUpdatedDate(new DateTime());
                $repository->merge($test);
            } catch (LockException $e) {
                return $this->msg(JsonResponse::HTTP_LOCKED, 'entity not updated. Try again.');
            }
        } else {
            $test->setCreateDate($data['create_date']);
            $test->setUpdatedDate($data['create_date']);
            $repository->persist($test);
        }

        return $this->msg(JsonResponse::HTTP_CREATED,  'ok');
    }

    /**
     * @Route("/api/tests", name="view_tests", methods={"GET"})
     *
     * @param TestRepository $repository
     * @param \JMS\Serializer\Serializer $serializer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function viewTests(TestRepository $repository, Serializer $serializer) {
        $allTests = $repository->findAll();

        return new Response(
          $serializer->serialize($allTests, 'json'),
          JsonResponse::HTTP_OK,
          [
            'Content-Type' => 'application/json',
            'Access-Control-Allow-Origin'=> '*',
          ]
        );
    }

    /**
     * @Route("/api/test/{uuid}", name="view_test", methods={"GET"})
     *
     * @param $uuid
     * @param TestRepository $repository
     * @param \JMS\Serializer\Serializer $serializer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function viewTest($uuid, TestRepository $repository, Serializer $serializer) {
        $test = $repository->findByUuid($uuid);
        return new Response(
          $serializer->serialize($test, 'json'),
          JsonResponse::HTTP_OK,
          [
            'Content-Type' => 'application/json',
            'Access-Control-Allow-Origin'=> '*',
          ]
        );
    }

    /**
     * @Route("/api/test/{id}", name="delete_test", methods={"DELETE"})
     *
     * @param string $uuid
     * @param TestRepository $repository
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function deleteTest($uuid, TestRepository $repository) {
        $repository->delete($uuid);
        return $this->msg(JsonResponse::HTTP_OK, 'Entity deleted.');
    }

    /**
     * @param $code
     * @param $msg
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    private function msg($code, $msg) {
        return new JsonResponse(['status' => $msg], $code);
    }
}
