<?php
namespace App\Controller\Command;

use FFI;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpKernel\KernelInterface;

#[Route('/api/command', name: 'api_command')]
class CommandController extends AbstractController
{
    #[Route('/run')]
    public function run(Request $request, KernelInterface $kernel): Response
    {

        $application = new Application($kernel);
        $application->setAutoExit(false);

        $input = new ArrayInput([
            'command' => $request->get('command'),
            // (optional) define the value of command arguments
            // 'fooArgument' => 'barValue',
            // (optional) pass options to the command
            // '--bar' => 'fooValue',
        ]);

        // Вы можете использовать NullOutput(), если вам не нужен вывод
        $output = new BufferedOutput();
        $application->run($input, $output);

        // вернуть вывод, не используйте, если вы использовали NullOutput()
        $content = $output->fetch();

        // вернуть новый Response(""), если вы использовали NullOutput()
        // return new Response($content);

        return new JsonResponse([
            'input' => $input,
            'output' => $output,
            'content' => $content,
            'new' => 'new CatalogController::run()',
            'request' => $request->get('command')
        ]);
    }
}
