<?php

declare(strict_types=1);

namespace App\Response\Message;

use App\Entity\Message;

class MessageFullResponse implements \JsonSerializable
{
    public function __construct(private Message $message) {}

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->message->getId(),
            'text' => $this->message->getMessage(),
            'from' => $this->message->getSendFrom(),
            'to' => $this->message->getSendTo(),
            'type' => $this->message->getType(),
            'createAt' => $this->message->getCreateAt(),
            'sid' => $this->message->getMessageSid(),
            'direction' => $this->message->getDirection(),
            'type' => $this->message->getType(),
        ];
    }
}