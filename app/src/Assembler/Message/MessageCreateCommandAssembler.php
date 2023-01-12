<?php

declare(strict_types=1);

namespace App\Assembler\Message;

use App\DTO\Message\MessageDTO;
use Symfony\Component\HttpFoundation\Request;
use Twilio\Rest\Api\V2010\Account\MessageInstance;

class MessageCreateCommandAssembler
{

    public function fromCreate(Request $request, MessageInstance $message) {
        if ($request->isMethod('POST')) {
            $params = json_decode($request->getContent());
            return new MessageDTO(
                $params->text,
                $message->__get('sid'),
                'created',
                'outbound-api',
                $params->to,
                $params->from,
            );
        }
        return new MessageDTO(
            $request->query->get('text'),
            $message->__get('sid'),
            'created',
            'outbound-api',
            $request->query->get('to'),
            $request->query->get('from')
        );
    }

    public function fromCallback(Request $request)
    {
        return new MessageDTO(
            $request->query->get('text'),
            $request->get('SmsSid'),
            $request->get('SmsStatus'),
            'inbound',
            $request->get('To'),
            $request->get('From'),
        );
    }
}