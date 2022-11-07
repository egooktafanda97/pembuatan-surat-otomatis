<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Industri extends Migration
{
    public function up()
    {
        Schema::create('industri', function (Blueprint $table) {
            $table->bigIncrements("id_industri");
            $table->bigInteger("user_id");
            $table->string('jenis_industri', 50);
            $table->string('sub_industri', 50);
            $table->string('nama_industri', 100);
            $table->string('perizinan_industri', 200);
            $table->string('besar_modal_industri', 100);
            $table->string('nama_pemilik_industri', 100);
            $table->string('telp_pemilik_industri', 16);
            $table->text('deskripsi_industri');
            $table->text('alamat_industri');
            $table->string('provinsi_id', 100);
            $table->string('kabupaten_id', 100);
            $table->string('kecamatan_id', 100);
            $table->string('kelurahan_id', 100);
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
        Schema::dropIfExists('industri');
    }
}
