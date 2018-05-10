<?php

namespace App\Controller;

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
        $dm = $this->get('doctrine_mongodb')->getManager();

        $dm->persist($user);
        $dm->flush();
        return new JsonResponse(array('Status' => 'OK'));
    }

    /**
     * @Route("/view")
     */
    public function viewDocuments() {
        /** @var \Doctrine\ODM\MongoDB\DocumentManager $dm */
        $dm = $this->get('doctrine_mongodb')->getManager();
        $repo = $dm->getRepository(Test::class);
        $allTests = $repo->findAll();

        var_dump($allTests);

        return new JsonResponse($allTests);
    }
}
