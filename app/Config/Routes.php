<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Default route
$routes->get('/', 'Home::index');

// Public routes
$routes->get('/artikel', 'Artikel::index');
$routes->get('/artikel/(:any)', 'Artikel::detail/$1');

// Static pages
$routes->get('/about', 'Page::about');
$routes->get('/contact', 'Page::contact');
$routes->get('/faqs', 'Page::faqs');

$routes->get('/user', 'User::index');
$routes->match(['get', 'post'], '/user/login', 'User::login');
$routes->get('/user/logout', 'User::logout');

// AJAX routes
$routes->group('ajax', function ($routes) {
    $routes->get('/', 'Ajax::index');
    $routes->get('getData', 'Ajax::getData');
    $routes->get('getDetail/(:num)', 'Ajax::getDetail/$1');
    $routes->post('add', 'Ajax::add');
    $routes->post('update/(:num)', 'Ajax::update/$1');
    $routes->delete('delete/(:num)', 'Ajax::delete/$1');
});

// API routes
$routes->get('post', 'Api\Post::index');
$routes->get('post/(:segment)', 'Api\Post::show/$1');
$routes->post('post', 'Api\Post::create', ['filter' => 'apiauth']);
$routes->put('post/(:segment)', 'Api\Post::update/$1', ['filter' => 'apiauth']);
$routes->delete('post/(:segment)', 'Api\Post::delete/$1', ['filter' => 'apiauth']);
$routes->post('api/login', 'Api\Auth::login');

// Admin routes
$routes->group('admin', ['filter' => 'auth'], function ($routes) {
    $routes->get('artikel', 'Artikel::adminIndex');
    $routes->get('artikel/add', 'Artikel::add');
    $routes->post('artikel/store', 'Artikel::store');
    $routes->get('artikel/edit/(:num)', 'Artikel::edit/$1');
    $routes->post('artikel/update/(:num)', 'Artikel::update/$1');
    $routes->get('artikel/delete/(:num)', 'Artikel::delete/$1');
    $routes->get('artikel/search', 'Artikel::search');
});

// Enable auto routing
