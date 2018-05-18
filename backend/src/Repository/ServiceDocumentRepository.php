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
        parent::__construct($dm, $dm->getUnitOfWork(), $dm->getClassMetadata($documentClass));
    }
}