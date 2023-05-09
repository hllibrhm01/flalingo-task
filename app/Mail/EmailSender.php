<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailSender extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct($user)
    {
        $this->user=$user;
    }

    public function build()
    {
        return $this->view('emailtempl')->subject('Email Sender');
    }

    /*
    public function envelope()
    {
        return new Envelope(
            subject: 'Email Sender',
        );
    }
    */

    /*
    public function content()
    {
        return new Content(
            html: view('emailtempl')->render(),
        );
    }
    */

    public function attachments()
    {
        return [];
    }
}
