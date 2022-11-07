<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenginapansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penginapan', function (Blueprint $table) {
            $table->bigIncrements("id_penginapan");
            $table->bigInteger("jenis_penginapan_id");
            $table->bigInteger("kelas_inap_id");
            $table->string("nama_penginapan");
            $table->string("jumlah_kamar");
            $table->string("perizinan");
            $table->string("nama_pemilik");
            $table->string("alamat_penginapan");
            $table->string("no_telp");
            $table->string("alamat_web");
            $table->string("laritude");
            $table->string("logitude");
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
        Schema::dropIfExists('penginapan');
    }
}
