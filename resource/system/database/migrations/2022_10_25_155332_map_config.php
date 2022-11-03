<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MapConfig extends Migration
{
    public function up()
    {
        Schema::create('map_config', function (Blueprint $table) {
            $table->bigIncrements("id_config");
            $table->string('config_key', 50);
            $table->string('config_value', 50);
            $table->bigInteger('table_config');
            $table->bigInteger('forenkey_id');
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
        Schema::dropIfExists('map_config');
    }
}
