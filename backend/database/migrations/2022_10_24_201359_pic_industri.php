<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PicIndustri extends Migration
{
    public function up()
    {
        Schema::create('pic_industri', function (Blueprint $table) {
            $table->bigIncrements("id_pic_industri");
            $table->string('pic_category_name', 200);
            $table->string('pic_industry_type_name', 50);
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
        Schema::dropIfExists('pic_industri');
    }
}
