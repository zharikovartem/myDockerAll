<?php

declare(strict_types=1);

namespace App\Response\Message;

use App\Entity\Message;

class MessageFullCollectionResponse implements \JsonSerializable
{
    public function __construct(private array $messages) {}

    public function jsonSerialize(): array
    {
        return \array_map(
            static fn (Message $message): MessageFullResponse =>
            new MessageFullResponse($message),
            $this->messages
        );
    }
}