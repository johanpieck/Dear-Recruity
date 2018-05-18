<?php
namespace App\Repository;

use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\DocumentRepository;

class ServiceDocumentRepository extends DocumentRepository
{
    /**
     * ServiceDocumentRepository constructor.
     *
     * @param \Doctrine\ODM\MongoDB\DocumentManager $dm
     * @param string $documentClass
     */
    public function __construct(DocumentManager $dm, $documentClass)
    {
        /**
         * HACK to be able to wire a DocumentRepository in our custom Repo
         * fix by creeating custom service
         */
        parent::__construct($dm, $dm->getUnitOfWork(), $dm->getClassMetadata($documentClass));
    }
}