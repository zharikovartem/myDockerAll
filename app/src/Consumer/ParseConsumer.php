<?php

namespace App\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;

class ParseConsumer implements ConsumerInterface
{
    public function execute(AMQPMessage $msg): bool
    {
        echo 'Ну тут типа сообщение пытаюсь отправить: '.$msg->getBody().PHP_EOL;
        echo 'Отправлено успешно!...';

        return true;
    }
}