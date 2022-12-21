<?php
// src/Command/CreateDirectoriesCommand.php
namespace App\Command;

use App\Repository\CatalogRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

// clear; bin/console app:create-directories
#[AsCommand(name: 'app:test-consumer')]
class TestComsumerCommand extends Command
{

    // bin/console rabbitmq:consumer parse -vvv
    // bin/console app:test-consumer
    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // dd('!!!');
        $this->container->get('old_sound_rabbit_mq.parse_producer')->publish('Сообщенька для отправки на мыло...');
        // $this->container->get('old_sound_rabbit_mq.send_email_producer')->publish('Сообщенька для отправки на мыло...');
        // 
        
        return Command::SUCCESS;
    }
}