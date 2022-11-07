<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Pendidikan extends Migration
{
    public function up()
    {
        Schema::create('pendidikan', function (Blueprint $table) {
            $table->bigIncrements("id_pendidikan");
            $table->bigInteger("user_id");
            $table->string('jenis_pendidikan', 50);
            $table->string('jenjang_pendidikan', 50);
            $table->string('nama_pendidikan', 200);
            $table->string('perizinan_pendidikan', 200);
            $table->string('jumlah_tenaga_pendidik', 200);
            $table->string('nama_pimpinan', 200);
            $table->string('provinsi_id', 100);
            $table->string('kabupaten_id', 100);
            $table->string('kecamatan_id', 100);
            $table->string('kelurahan_id', 100);
            $table->string('alamat_lengkap_pendidikan', 200);
            $table->string('website_pendidikan', 200);
            $table->string('koordinat_pendidikan', 200);
            $table->text('gambar');
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
        Schema::dropIfExists('pendidikan');
    }
}
