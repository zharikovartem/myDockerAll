<?php

namespace App\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;

class MailSenderConsumer implements ConsumerInterface
{
    public function execute(AMQPMessage $msg)
    {
        echo 'Ну тут типа сообщение пытаюсь отправить: '.$msg->getBody().PHP_EOL;
        echo 'Отправлено успешно!...';
    }
}