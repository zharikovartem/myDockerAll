<?php

namespace App\Response\Catalog;

use App\Entity\Catalog;
use App\Entity\User;
use App\Response\Address\AddressFullResponse;
use App\Response\Category\CategoryResponse;
use App\Response\Currency\CurrencyFullCollectionResponse;
use Doctrine\ORM\EntityManagerInterface;

class CatalogFullCollectionResponse implements \JsonSerializable
{
    /**
     * @var Catalog[]
     */
    private array $catalogs;

    public function __construct(
        iterable $catalogs
    ) {
        $this->brandItems = $catalogs;;
    }

    public function jsonSerialize(): array
    {
        $result = \array_reduce(
            $this->brandItems,
            static function (array $catalogs, Catalog $catalog = null) {
                if ($catalog && $catalog->isIsActive()) {
                    /** @var Catalog $catalog */
                    $catalogs[] = [
                        'id' => $catalog->getId(),
                        'name' => $catalog->getName(),
                        'parent' => $catalog->getParent() ? $catalog->getParent()->getId() : null,
                        'url' => $catalog->getUrl()
                    ];
                }
                

                return $catalogs;
            },
            []
        );
        return $result;
    }
}