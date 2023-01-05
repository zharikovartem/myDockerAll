<?php
namespace App\Service;

use App\Entity\Catalog;
use App\Repository\CatalogRepository;
use DiDom\Document;
use Doctrine\ORM\EntityManagerInterface;

class CatalogService
{

    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly CatalogRepository $catalogRepository
    ) { }

    public function getHappyMessage(): array
    {
        $catalog = $this->catalogRepository->findAll();
        $catalogByName = array();
        foreach ($catalog as $key => $value) {
            $catalogByName[$value->getName()] = $value;
        }

        // $base = 'https://catalog.onliner.by/';
        // $base = 'https://market.yandex.by/catalog--roboty-pylesosy/22493230/list?rs=eJwzEvDiEeIyNDc2szQ2MzQ3T2AEAButAyg%2C&hid=16302536&allowCollapsing=1&local-offers-first=0';
        // $base = 'https://suchen.mobile.de/fahrzeuge/svc/similar/?c=OffRoad&ms=9000%3B33&id%21=340937802&vc=Car&sid=463011&p=20990';
        // $base = 'https://cars.av.by/filter?page=1';
        $base = 'https://cars.av.by/renault/megane/103233784';

        $document = new Document($base, false);
        dd($document);
        var_dump($document);
        die();
        $NamesById = [];

        foreach ($document->find('.catalog-navigation-classifier__item') as $key => $name) {
            $dataId = $name->getAttribute('data-id');
            if ( count(explode('brand-', $dataId)) == 1 ) {
                $NamesById[$name->getAttribute('data-id')] = $name->text();
            }
        }

        $resp = [];

        $blocks = $document->find('.catalog-navigation-list__category');
        // dd($blocks);

        foreach($blocks as $key => $block) {
            $blockNum = $block->getAttribute('data-id');
            if ( isset($NamesById[$blockNum]) ) {
                # Создаем блок
                if ( !isset( $catalogByName[trim($NamesById[$blockNum])] ) ) {
                    // $blockItem = [
                    //         'name'=>trim($NamesById[$blockNum]),
                    //         'parent_id'=>'0',
                    //         'label'=>trim($NamesById[$blockNum]),
                    //         'type'=>'block'
                    //     ];

                    $blockItem = new Catalog();
                    $blockItem->setName(trim($NamesById[$blockNum]));
                    $this->entityManager->persist($blockItem);


                    $resp[] = $blockItem;
                    $blockId = $blockItem;//->getId();
                } else {
                    $blockId = $catalogByName[ trim($NamesById[$blockNum]) ];//->getId();
                }


                $items = $block->find('.catalog-navigation-list__aside-title');
                $groups = $block->find('.catalog-navigation-list__dropdown');
                foreach ($items as $key => $item) {
                    $links = $groups[$key]->find('.catalog-navigation-list__dropdown-item');
                    if ( !isset( $catalogByName[ trim( $item->text() ) ] ) ) {
                        // return [
                        //         'name'=>trim($item->text()),
                        //         'parent_id'=>$blockId,
                        //         'label'=>trim($key),
                        //         'type'=>'subBlock',
                        // ];
                        $subBlockItem = new Catalog();
                        $subBlockItem->setName(trim($NamesById[$blockNum]));
                        $subBlockItem->setParent($blockId);
                        $this->entityManager->persist($subBlockItem);
                        $subBlockItemId = $subBlockItem;//->getId();

                        // $subBlockItem = Catalog::create(
                        //     [
                        //         'name'=>trim($item->text()),
                        //         'parent_id'=>$blockId,
                        //         'label'=>trim($key),
                        //         'type'=>'subBlock',
                        //     ]
                        // );
                        // $subBlockItemId = $subBlockItem->id;
                    } else {
                        $subBlockItemId = $catalogByName[ trim($item->text()) ];//->getId();
                    }

                    foreach ($links as $key => $link) {
                        $linkName = $link->find('.catalog-navigation-list__dropdown-title')[0]->text();
                        $name = explode('?', explode( '/', $link->getAttribute('href') )[3] )[0];
                        if (!isset($catalogByName[$name])) {
                            // $item = Catalog::create(
                            //     [
                            //         'name'=>$name,
                            //         'parent_id'=> $subBlockItemId,
                            //         'label'=>trim($linkName),
                            //         'labels'=>trim($linkName),
                            //         'url'=>explode('?', $link->getAttribute('href'))[0],
                            //         'full_url'=>$link->getAttribute('href'),
                            //         'type'=>'item'
                            //     ]
                            // );
                            $item = new Catalog();
                            $item->setName($name);
                            $item->setParent($subBlockItemId);
                            $item->setUrl(explode('?', $link->getAttribute('href'))[0]);

                            $this->entityManager->persist($item);
                        }
                    }
                }
            }
        }

        $this->entityManager->flush();

        return $resp;
    }
}