<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SektorIndustri extends Migration
{
    public function up()
    {
        Schema::create('sektor_industri', function (Blueprint $table) {
            $table->bigIncrements("id_sektor_industri");
            $table->string('nama_sektor_utama_industri', 200);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sektor_industri');
    }
}
