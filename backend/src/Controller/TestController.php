<?php

namespace App\Controller;

use App\Document\Step;
use DateTime;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\LockException;
use JMS\Serializer\Serializer;
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
     * @param \Doctrine\ODM\MongoDB\DocumentManager $dm
     * @param \JMS\Serializer\Serializer $serializer
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function post_test(Request $request, DocumentManager $dm, Serializer $serializer)
    {
        $data = json_decode($request->getContent(), true);
        if (empty($data) || !isset($data['uuid'])) {
            return $this->msg(JsonResponse::HTTP_NOT_ACCEPTABLE, 'uuid required');
        }

        $uuid = trim($data['uuid']);

        $test = new Test();
        $test->setUuid($uuid);
        $test->setEmail($data['email']);
        $test->setFirstname($data['firstname']);
        $test->setLastname($data['lastname']);

        $steps = [];
        foreach ($data['steps'] as $step_input) {
            $steps[] = new Step($step_input['question'], $step_input['answer']);
        }
        $test->setSteps($steps);

        $repo = $dm->getRepository(Test::class);
        /** @var Test $result */
        $result = $repo->findOneBy(['uuid' => $uuid]);

        if($result) {
            try {
                $test->setId($result->getId());
                $test->setCreateDate($result->getCreateDate());
                $test->setUpdatedDate(new DateTime());
                $dm->merge($test);
            } catch (LockException $e) {
                return $this->msg(JsonResponse::HTTP_LOCKED, 'Entity not updated. Try again.');
            }
        } else {
            $test->setCreateDate($data['create_date']);
            $test->setUpdatedDate($data['create_date']);
            $dm->persist($test);
        }

        $dm->flush();
        return $this->msg(JsonResponse::HTTP_CREATED,  $serializer->serialize($test, 'json'));
    }

    /**
     * @Route("/api/tests", name="view_tests", methods={"GET"})
     *
     * @param \Doctrine\ODM\MongoDB\DocumentManager $dm
     * @param \JMS\Serializer\Serializer $serializer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function viewTests(DocumentManager $dm, Serializer $serializer) {
        $repo = $dm->getRepository(Test::class);
        $allTests = $repo->findAll();

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
     * @param \Doctrine\ODM\MongoDB\DocumentManager $dm
     * @param \JMS\Serializer\Serializer $serializer
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function viewTest($uuid, DocumentManager $dm, Serializer $serializer) {
        $repo = $dm->getRepository(Test::class);
        $test = $repo->findOneBy(['uuid' => $uuid]);

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
     * @param $id
     * @param \Doctrine\ODM\MongoDB\DocumentManager $dm
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function deleteTest($id, DocumentManager $dm) {
        $repo = $dm->getRepository(Test::class);
        $test = $repo->find($id);

        $dm->remove($test);
        $dm->flush();

        return $this->msg(JsonResponse::HTTP_OK, 'Entity deleted.');
    }

    /**
     * @param $code
     * @param $msg
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    private function msg($code, $msg) {
        return new JsonResponse(
          [
            'status' => $msg,
          ],
          $code
        );
    }
}
