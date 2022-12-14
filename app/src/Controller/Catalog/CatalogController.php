<?php
namespace App\Controller\Catalog;

use App\Repository\CatalogRepository;
use App\Response\Catalog\CatalogFullCollectionResponse;
use App\Service\CatalogService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api')]
class CatalogController extends AbstractController
{
    #[Route('/catalog/get')]
    public function new(CatalogService $messageGenerator): Response
    {
        $message = $messageGenerator->getHappyMessage();
        $this->addFlash('success', $message);
        // ...

        return new JsonResponse([
            'new' => 'new',
            'message' => $message
        ]);
    }

    #[Route('/catalog/get_all')]
    public function list(CatalogRepository $catalogRepository): Response
    {
        $catalog = $catalogRepository->findAll();

        return new JsonResponse([
            'items' => new CatalogFullCollectionResponse($catalog),
            'totalCount' => count($catalog)
        ]);
    }
}