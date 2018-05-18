<?php
/**
 * Created by PhpStorm.
 * User: bklos
 * Date: 18/05/2018
 * Time: 12:56
 */

namespace App\Repository;

use App\Document\Test;
use Doctrine\ODM\MongoDB\DocumentManager;

/**
 * Class TestRepository
 * @package App\Repository
 */
class TestRepository extends ServiceDocumentRepository
{

    /**
     * TestRepository constructor.
     *
     * @param DocumentManager $dm
     */
    public function __construct(DocumentManager $dm)
    {
        parent::__construct($dm, Test::class);
    }

    /**
     * @param string $uuid
     * @return \App\Document\Test
     */
    public function findByUuid($uuid) {
        /** @var \App\Document\Test $test */
        $test = $this->findOneBy(['uuid' => $uuid]);
        return $test;
    }

    /**
     * @param Test $test
     * @throws \Doctrine\ODM\MongoDB\LockException
     */
    public function merge($test) {
        $this->getDocumentManager()->merge($test);
        $this->getDocumentManager()->flush();
    }

    /**
     * @param Test $test
     */
    public function persist($test) {
        $this->getDocumentManager()->persist($test);
        $this->getDocumentManager()->flush();
    }

    /**
     * @param string $uuid
     */
    public function delete($uuid) {
        $test = $this->findByUuid($uuid);

        if($test) {
            $this->getDocumentManager()->remove($test);
            $this->getDocumentManager()->flush();
        }
    }
}