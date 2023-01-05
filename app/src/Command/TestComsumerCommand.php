<?php
// src/Command/CreateDirectoriesCommand.php
namespace App\Command;

use App\Repository\CatalogRepository;
use App\Service\RabbitService;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

// clear; bin/console app:test-consumer
#[AsCommand(name: 'app:test-consumer')]
class TestComsumerCommand extends Command
{

    // bin/console rabbitmq:consumer parse -vvv
    // bin/console app:test-consumer

    public function __construct(
        private readonly RabbitService $rabbitService,
    ) {
        parent::__construct();
    }
    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $result = $this->rabbitService->publishParseQueue([
            'message' => 'TEST'
        ]);
        
        return Command::SUCCESS;
    }
}