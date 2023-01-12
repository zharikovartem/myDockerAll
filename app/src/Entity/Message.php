<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\DTO\Message\MessageDTO;
use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[ApiResource]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $sentAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createAt = null;

    #[ORM\Column]
    private ?int $senderId = null;

    #[ORM\Column(length: 5000)]
    private ?string $message = null;

    #[ORM\Column(length: 255)]
    private ?string $sendTo = null;

    #[ORM\Column(length: 255)]
    private ?string $sendFrom = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column(length: 255)]
    private ?string $direction = null;

    #[ORM\Column(length: 255)]
    private ?string $messageSid = null;

    public function __construct(MessageDTO $dto) {
        $this->createAt = new \DateTimeImmutable();
        $this->type = 'sms';
        $this->senderId = 0;
        $this->message = $dto->message;
        $this->messageSid = $dto->messageSid;
        $this->status = $dto->status;
        $this->direction = $dto->direction;
        $this->sendTo = $dto->sendTo;
        $this->sendFrom = $dto->sendFrom;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getSentAt(): ?\DateTimeImmutable
    {
        return $this->sentAt;
    }

    public function setSentAt(?\DateTimeImmutable $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeImmutable
    {
        return $this->createAt;
    }

    public function setCreateAt(\DateTimeImmutable $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getSenderId(): ?int
    {
        return $this->senderId;
    }

    public function setSenderId(int $senderId): self
    {
        $this->senderId = $senderId;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getSendTo(): ?string
    {
        return $this->sendTo;
    }

    public function setSendTo(string $sendTo): self
    {
        $this->sendTo = $sendTo;

        return $this;
    }

    public function getSendFrom(): ?string
    {
        return $this->sendFrom;
    }

    public function setSendFrom(string $sendFrom): self
    {
        $this->sendFrom = $sendFrom;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get the value of messageSid
     */ 
    public function getMessageSid()
    {
        return $this->messageSid;
    }

    /**
     * Set the value of messageSid
     *
     * @return  self
     */ 
    public function setMessageSid($messageSid)
    {
        $this->messageSid = $messageSid;

        return $this;
    }

    /**
     * Get the value of direction
     */ 
    public function getDirection()
    {
        return $this->direction;
    }

    /**
     * Set the value of direction
     *
     * @return  self
     */ 
    public function setDirection($direction)
    {
        $this->direction = $direction;

        return $this;
    }
}
