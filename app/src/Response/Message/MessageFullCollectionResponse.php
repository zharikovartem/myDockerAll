<?php

declare(strict_types=1);

namespace App\Response\Message;

use App\Entity\Message;

class MessageFullCollectionResponse implements \JsonSerializable
{
    private array $messages;

    public function __construct(iterable $messages) {
        $this->messages = $messages;
    }

    public function jsonSerialize(): array
    {
        return \array_map(
            static fn (Message $message): array => [
                'id' => $message->getId(),
                'text' => $message->getMessage()
            ],
            $this->messages
        );
    }
}