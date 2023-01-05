<?php
declare(strict_types=1);

namespace App\Service;


// use App\Services\Exception\RabbitServicesException;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use RuntimeException;

/**
 * @method RabbitServices|bool checkParseQueue()
 * @method RabbitServices|int countParseQueue()
 * @method RabbitServices|void publishParseQueue(array $arguments = [], int $priority = RabbitServices::PRIORITY_MIN)
 */
class RabbitService
{
    public const PRIORITY_MAX = 10;
    public const PRIORITY_HIGH = 8;
    public const PRIORITY_MID = 5;
    public const PRIORITY_LOW = 3;
    public const PRIORITY_MIN = 1;

    public function __construct(
        private ProducerInterface $parseProducer,
    ) {
    }

    public function __call(string $name, array $arguments)
    {
        $res = [];
        $producer = str_replace(['check', 'count', 'publish', 'Queue'], '', $name);
        preg_match_all('/[A-Z][^A-Z]*?/Usu', $producer,$res);
        $queue = implode('_', array_map('strtolower', $res[0]));
        if (strpos($name, 'check') !== false) {
            return $this->check($queue);
        }
        if (strpos($name, 'count') !== false) {
            return $this->count($queue);
        }
        if (strpos($name, 'publish') !== false) {
            return $this->publish($producer, $arguments);
        }

        throw new RuntimeException('Error, not found type');
    }

    private function publish(string $producer, array $arguments): void
    {
        $function = sprintf('%sProducer', lcfirst($producer));
        $this->{$function}->publish(
            json_encode(
                $arguments,
                JSON_THROW_ON_ERROR,
                512
            ),
            '',
            [
                'priority'      => $arguments[2] ?? self::PRIORITY_MIN,
                'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT,
            ]
        );
    }
}