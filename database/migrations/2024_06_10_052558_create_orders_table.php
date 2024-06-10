<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            // $table->decimal('total', 10, 2);
            // $table->decimal('paid', 10, 2);
            // $table->enum('payment', ['cash', 'e-paymant', 'bank-card'])->default('cash');
            $table->enum('status', ['pending', 'served', 'cancel'])->default('pending');
            $table->unsignedBigInteger('table_id');
            $table->unsignedBigInteger('waiter_id');
            $table->timestamps();
            $table->foreign('table_id')->references('id')->on('restaurant_tables')->onDelete('cascade');
            $table->foreign('waiter_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
