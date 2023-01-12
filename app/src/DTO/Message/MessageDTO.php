<?php

declare(strict_types=1);

namespace App\DTO\Message;

readonly class MessageDTO
{
    public function __construct(
        public string $message,
        public string $messageSid,
        public string $status,
        public string $direction,
        public string $sendTo,
        public string $sendFrom,
    ) {}
}