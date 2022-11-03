<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SubSektorIndustri extends Migration
{
    public function up()
    {
        Schema::create('sub_sektor_industri', function (Blueprint $table) {
            $table->bigIncrements("id_sektor_industri");
            $table->string('nama_subsektor_industri', 200);
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
        Schema::dropIfExists('sub_sektor_industri');
    }
}
