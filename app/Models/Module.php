<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'description',
        'icon',
        'route',
        'role_id',
        'active',
        'order'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}