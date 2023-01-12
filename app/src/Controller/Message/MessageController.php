<?php

namespace App\Controller\Message;

use App\Assembler\Message\MessageCreateCommandAssembler;
use App\Entity\Message;
use App\Repository\MessageRepository;
use App\Response\Message\MessageFullCollectionResponse;
use App\Response\Message\MessageFullResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Twilio\Rest\Client;

#[Route('/api', name: 'api')]
class MessageController extends AbstractController
{

    #[Route('/get_all')]
    public function getAll(MessageRepository $messageRepository): JsonResponse
    {
        return new JsonResponse([
            'func' => 'getAll',
            'items' => new MessageFullCollectionResponse($messageRepository->findAll())
        ]);
    }

    #[Route('/incoming_sms')]
    public function callback(Request $request, ManagerRegistry $doctrine, MessageCreateCommandAssembler $assembler): Response
    {
        $message = new Message($assembler->fromCallback($request));
        dd($message);

        $em = $doctrine->getManager();
        $em->persist($message);
        $em->flush();

        $response = new Response('<Response></Response>');
        // $response = new Response('<Response><Message>'.json_encode($request->request->all()).'</Message></Response>');
        $response->headers->set('content-type', 'text/xml');

        echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        return $response;
    }

    // http://localhost:8081/api/send?token=0966fab929fd9dd8c7dbefbb2e5be24a&text=new%20message_from_service-2&from=%2B18595497065&to=%2B375447383125&dd=true
    #[Route('/send')]
    public function send(Request $request, ManagerRegistry $doctrine, MessageCreateCommandAssembler $assembler): JsonResponse
    {
        $params = json_decode($request->getContent()) ?? (object)$request->query->all();

        $sid = $_ENV['TWILIO_ACCOUNT_SID'];
        $tocken = $params->tocken ?? $_ENV['TWILIO_AUTH_TOKEN'];
        $from = $params->from ?? "+18595497065";
        $to = $params->to ?? "+375447383125";

        if (isset($params->dd)){
            dump($sid);
            dump($params->text);
            dump($params->from);
            dump($params->to);
            dd($tocken);
        }

        $client = new Client($sid, $tocken);

        $response = $client->messages->create(
            $to,
            array(
                "from" => $from,
                "body" => $request->query->get('text') ?? "Message from server"
            )
        );

        $message = new Message($assembler->fromCreate($request, $response));
        $em = $doctrine->getManager();
        $em->persist($message);
        $em->flush();

        return new JsonResponse([
            'func' => 'new send',
            'client_sid' => $sid,
            'client_tocken' => $tocken,
            'response' => $response->__toString(),
            'response_sid' => $response->__get('sid'),
            'message' => new MessageFullResponse($message)
        ]);
    }

    #[Route('/get_messages')]
    public function getMessages(Request $request): JsonResponse
    {
        $sid = $_ENV['TWILIO_ACCOUNT_SID'];
        $tocken = $request->query->get('token') ?? $_ENV['TWILIO_AUTH_TOKEN'];

        // http//:demo.twilio.com/welcom/sms/reply
        // https://timberwolf-mastiff-9776.twil.io/demo-reply

        $client = new Client($sid, $tocken);
        $messages = [];

        foreach ($client->messages->stream([], 5) as $message) {
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