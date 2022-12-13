<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

// use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture 
{

    //  /**
    //  * @var UserPasswordEncoderInterface
    //  */
    // private UserPasswordEncoderInterface $encoder;

    // /**
    //  * Users constructor.
    //  * @param UserPasswordEncoderInterface $encoder
    //  */
    // public function __construct(UserPasswordEncoderInterface $encoder)
    // {
    //     $this->encoder = $encoder;
    // }

    public function __construct(
        private readonly UserPasswordHasherInterface $userPasswordHasher
        // private readonly UserRepository $userRepository,
        // private readonly EntityManagerInterface $entityManager,
    ) {
    }

    
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

        $user->setPassword($this->userPasswordHasher->hashPassword($user, '12345678'));

        // $hashedPassword = $passwordHasher->hashPassword(
        //     $user,
        //     $plaintextPassword
        // );

        $user->setRoles([$role])
            // ->setFullName($name)
            ->setEmail($email);
            // ->setIsActive(true)
            // ->setPassword('12345678');
        return $user;
    }
}
