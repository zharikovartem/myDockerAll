<?php

namespace app\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\BaseConsumer;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;

class ParseConsumer extends BaseConsumer
{
    public function execute(AMQPMessage $msg)
    {
        echo 'Ну тут типа сообщение пытаюсь отправить: '.$msg->getBody().PHP_EOL;
        echo 'Отправлено успешно!...';
    }
}