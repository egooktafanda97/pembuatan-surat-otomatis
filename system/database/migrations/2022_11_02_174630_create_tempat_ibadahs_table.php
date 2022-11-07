<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTempatIbadahsTable extends Migration
{
    public function up()
    {
        Schema::create('tempat_ibadah', function (Blueprint $table) {
            $table->bigIncrements("id_tempat_ibadah");
            $table->string("jenis_tempat_ibadah");
            $table->string("nama_tempat_ibadah");
            $table->string("luas_tempat_ibadah");
            $table->string("perizinan");
            $table->string("alamat");
            $table->string("nama_penanggung_jawab");
            $table->string("no_telp");
            $table->string("latitude");
            $table->string("longitude");
            $table->string("alamat_website");
            $table->string("gambar");
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
        Schema::dropIfExists('tempat_ibadah');
    }
}
