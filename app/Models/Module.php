<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'description',
        'icon',
        'route',
        'role',
        'parent_id',
        'active',
        'order'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Module::class, 'parent_id')->where('active', true)->orderBy('order');
    }

    public function scopeRootModules($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeForRole($query, $roleName)
    {
        return $query->where('role', $roleName);
    }
}