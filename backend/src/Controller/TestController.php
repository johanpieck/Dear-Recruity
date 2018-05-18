<?php

namespace App\Controller;

use App\Document\Step;
use Doctrine\ODM\MongoDB\DocumentManager;
use JMS\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Document\Test;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;


class TestController extends Controller
{
    /**
     * @Route("/mongoTest")
     */
    public function mongoTest()
    {
        $user = new Test();
        $user->setEmail("hello@medium.com");
        $user->setFirstname("Matt");
        $user->setLastname("Matt");

        $user->setSteps([
          new Step("question 1", "answer 1"),
          new Step("question 2", "answer 2"),
        ]);

        $dm = $this->get('doctrine_mongodb')->getManager();

        $dm->persist($user);
        $dm->flush();
        return new JsonResponse(array('Status' => 'OK'));
    }

    /**
     * @Route("/api/tests")
     */
    public function viewTests(DocumentManager $dm, Serializer $serializer) {
        $repo = $dm->getRepository(Test::class);
        $allTests = $repo->findAll();

        return new Response(
          $serializer->serialize($allTests, 'json'),
          200,
          ['Content-Type' => 'application/json']
        );
    }

    /**
     * @Route("/api/test/{id}")
     */
    public function viewTest($id, DocumentManager $dm, Serializer $serializer) {
        $repo = $dm->getRepository(Test::class);
        $test = $repo->find($id);

        return new Response(
          $serializer->serialize($test, 'json'),
          200,
          ['Content-Type' => 'application/json']
        );
    }
}
