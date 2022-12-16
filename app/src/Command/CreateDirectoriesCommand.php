<?php
// src/Command/CreateDirectoriesCommand.php
namespace App\Command;

use App\Repository\CatalogRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

// clear; bin/console app:create-directories
#[AsCommand(name: 'app:create-directories')]
class CreateDirectoriesCommand extends Command
{
    private CatalogRepository $catalogRepository;

    public function __construct(
        CatalogRepository $catalogRepository
    ) {
        $this->catalogRepository = $catalogRepository;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->process('hoods');
        return Command::SUCCESS;
    }

    public function process(string $slug)
    {
        dump($slug);
        dd($this->catalogRepository->checkTable($slug));
    }
}