<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $manager->persist($this->addAdmin('admin@admin.com', 'admin'));

        $manager->flush();
    }

    private function addAdmin(string $email, string $name, $role = User::ROLE_ADMIN)
    {
        $user = new User();

        $user->setRoles([$role])
            // ->setFullName($name)
            ->setEmail($email)
            // ->setIsActive(true)
            ->setPassword('12345678');
        return $user;
    }
}
