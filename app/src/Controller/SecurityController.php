<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/api', name: 'api')]
class SecurityController extends AbstractController
{
    #[Route('/checkauth', name: '_checkauth')]
    public function checkauth(): Response
    {
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(["code" => 401, "message" => "Invalid credentials."], 401);
        }

        return new JsonResponse([
            // 'id' =>$user->getId(),
            'userId' => '???',
        ]);
    }
}
