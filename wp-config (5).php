<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'kpkbrcmc_wp56' );

/** Database username */
define( 'DB_USER', 'kpkbrcmc_kinyua' );

/** Database password */
define( 'DB_PASSWORD', 'Kinyuakibe7?' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'fcfkummccqyikdk9q0z4muszycllynuamde1wdw72yscscadtaberpxredldrxxd' );
define( 'SECURE_AUTH_KEY',  'vxr6tbnnehwlwf8xuugkjfoojau0nv9mkat0sqpkplaquqru3b6i0okash7mxti9' );
define( 'LOGGED_IN_KEY',    '9f8jh0v55k0pbm52mjlukffkh0sb6xkfnwbb9uwkijrmtqsyza4wdfss5n7lh0wz' );
define( 'NONCE_KEY',        'r70lsghrjjmjyjdjlfycldhkyaradomxgzdxh72ydzey4k5z9kuxeuaxfhe83q19' );
define( 'AUTH_SALT',        '9ijcedwyoswze6yerwu1rhnyuieq4khdp2kgofjqrq0sjxfebdzdzhxied1qtv6q' );
define( 'SECURE_AUTH_SALT', 'd6z2puzd8msuq1wcrw2jxuiegrf0gon6itdka9qol8fwj2azb2ykrs34zrni0uxy' );
define( 'LOGGED_IN_SALT',   'i0leop4y9p5enqwatfob1p64ckak86bllvi2hmu5kyfdntf1p3lsk4ukmzyhpd3x' );
define( 'NONCE_SALT',       'ysa4nqeinltzyin4gzrne6x1qc6dcldtlpr27f40ayu12mvxzhjxj40qao1k5vsz' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wpdj_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */

define('WP_MEMORY_LIMIT', '256M');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
