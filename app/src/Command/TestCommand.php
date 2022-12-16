<?php

namespace App\Conmmand;

use App\Repository\CatalogRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Command\LockableTrait;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class TestCommand extends Command
{

    use LockableTrait;

    public function __construct(
        CatalogRepository $catalogRepository
    ) {
        parent::__construct();
    }


    protected function configure(): void
    {
        $this->setName('test:get');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $this->process('hoods');

        return Command::SUCCESS;

    }

    public function process(string $slug)
    {
        dd($this->catalogRepository->checkTable($slug));
    }

}