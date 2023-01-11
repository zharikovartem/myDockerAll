<?php

namespace App\Controller\Message;

use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Response\Message\MessageFullCollectionResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Twilio\Rest\Client;

#[Route('/api', name: 'api')]
class MessageController extends AbstractController
{

    #[Route('/get_all')]
    public function getAll(MessageRepository $messageRepository): JsonResponse
    {
        return new JsonResponse([
            'func' => 'index',
            'items' => new MessageFullCollectionResponse($messageRepository->findAll())
        ]);
    }

    #[Route('/incoming_sms')]
    public function callback(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $body = json_encode($request->query->all());
        $message = new Message();

        $message->setMessage($body);
        $message->setType('incoming_sms');
        $message->setSenderId(1);
        $message->setSendTo('test To');
        $message->setSendFrom('test From');
        $message->setStatus('test status');

        $em = $doctrine->getManager();
        $em->persist($message);
        $em->flush();

        return new JsonResponse([
            'func' => 'callback success',
            'request' => $request->query->all()
        ]);
    }

    #[Route('/send')]
    public function send(): JsonResponse
    {
        $sid = $_ENV['TWILIO_ACCOUNT_SID'];
        $tocken = $_ENV['TWILIO_AUTH_TOKEN'];
        // $sid = $_ENV['MAIN_TWILIO_ACCOUNT_SID'];
        // $tocken = $_ENV['MAIN_TWILIO_AUTH_TOKEN'];

        $twilio_number = "+18595497065";

        $client = new Client($sid, $tocken);

        $client->messages->create(
            '+375447383125',
            array(
                "from" => $twilio_number,
                "body" => "Message from server"
            )
        );

        return new JsonResponse([
            'func' => 'new send',
            'client' => $client
        ]);
    }

    #[Route('/get_messages')]
    public function getMessages(): JsonResponse
    {
        $sid = $_ENV['TWILIO_ACCOUNT_SID'];
        $tocken = $_ENV['TWILIO_AUTH_TOKEN'];

        $client = new Client($sid, $tocken);
        $messages = [];

        foreach ($client->messages->stream() as $message) {
            $messages[] = [
                'price' => $message->price,
                'body' => $message->body,
                'from' => $message->from,
                'to' => $message->to,
                'direction' => $message->direction,
                'dateSent' => $message->dateSent
            ];
        }

        return new JsonResponse([
            'func' => 'new get_messages',
            'messages' => $messages
        ]);
    }

    #[Route('/get_numbers')]
    public function getNumbers(): JsonResponse
    {
        $sid = $_ENV['MAIN_TWILIO_ACCOUNT_SID'];
        $tocken = $_ENV['MAIN_TWILIO_AUTH_TOKEN'];

        $twilio_number = "+18595497065";
        $client = new Client($sid, $tocken);

        dd($client->__get('numbers')->getClient()->getAccount());

        return new JsonResponse([
            'func' => 'new send',
            'client' => $client
        ]);
    }
}