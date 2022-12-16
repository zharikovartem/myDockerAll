<?php

namespace App\Response\Catalog;

use App\Entity\Catalog;
use App\Response\City\CityFullResponse;
use App\Response\Country\CountryFullResponse;
use App\Response\State\StateFullResponse;

class CatalogFullResponse implements \JsonSerializable
{
    /**
     * @var Catalog
     */
    private Catalog $catalog;

    public function __construct(Catalog $Catalog) {
        $this->Catalog = $Catalog;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->catalog->getId(),
            'name' => $this->catalog->getName(),
        ];
    }
}