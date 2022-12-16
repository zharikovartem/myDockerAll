<?php

namespace App\EventListener;


use ApiPlatform\State\Pagination\PaginatorInterface;
use ApiPlatform\State\Pagination\PartialPaginatorInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\KernelEvents;

class PaginationHeadersListener implements EventSubscriberInterface
{
    public function onKernelResponse(ResponseEvent $event): void
    {
        if (HttpKernelInterface::MAIN_REQUEST !== $event->getRequestType()) {
            return;
        }

        $request = $event->getRequest();
        $data = $request->attributes->get('data');

        if (!$data instanceof PartialPaginatorInterface) {
            return;
        }

        if (!$data instanceof PaginatorInterface) {
            return;
        }

        $response = $event->getResponse();
        if ($response->getStatusCode() !== 200) {
            return;
        }

        $content = [
            'items' => json_decode($response->getContent(), true, 512, JSON_THROW_ON_ERROR),
            'page' => (int) $data->getCurrentPage(),
            'perPage' => (int) $data->getItemsPerPage(),
            'lastPage' => (int) $data->getLastPage(),
            'totalCount' => (int) $data->getTotalItems()
        ];
        $response->setContent(json_encode($content, JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR));
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => ['onKernelResponse'],
        ];
    }
}