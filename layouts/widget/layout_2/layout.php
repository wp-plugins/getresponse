<?php

/**
 * @package    Optin Cat
 */

$layout = array(

	'name' => __( 'Layout 2' ),

	'editables' => array(

		// Added to the fieldset "Form Background"
		'form' => array(
			'.fca_eoi_layout_2' => array(
				'background-color' => array( __( 'Form Background Color' ), 'eeeeee' ),
			),
		),

		// Added to the fieldset "Headline"
		'headline' => array(
			'.fca_eoi_layout_2 .fca_eoi_layout_2_headline_copy_wrapper' => array(
				'font-weight'      => array( '', 'bold' ),
				'font-style'       => array( '', 'italic' ),
				'text-decoration'  => array( '', 'underline' ),
				'font-size'        => array( __( 'Font Size' ), '20px' ),
			),
			'.fca_eoi_layout_2 .ribbon' => array(
				'color'            => array( __( 'Font Color' ), '#FFF' ),
				'background-color' => array( __( 'Background Color' ), '#3197e1' ),
			),
			'.fca_eoi_layout_2 .ribbon .ribbon-content:before, .fca_eoi_layout_2 .ribbon .ribbon-content:after' => array(
				'border-top-color' => array( __( 'Fold Background Color' ), '#256fa6' ),
			),
		),

		// Added to the fieldset "Description"
		'description' => array(
			'.fca_eoi_layout_2 .fca_eoi_layout_2_description_copy_wrapper' => array(
				'font-size'        => array( __( 'Font Size' ), '14px' ),
				'color' => array( __('Font Color') , '#000' ),
			),
		),

		// Added to the fieldset "Name"
		'name_field' => array(
			'.fca_eoi_layout_2 .fca_eoi_layout_2_name_field_wrapper' => array(
				'background-color' => array( __('Background Color') , '#FFF' ),
				'border-color' => array( __('Border Color') , '#FFF' ),
			),
			'.fca_eoi_layout_2 .fca_eoi_layout_2_name_field_wrapper input, .fca_eoi_layout_2 .fca_eoi_layout_2_name_field_wrapper .fa' => array(
				'color' => array( __('Font Color') , '#000' ),
			),
		),

		// Added to the fieldset "Email"
		'email_field' => array(
			'.fca_eoi_layout_2 .fca_eoi_layout_2_email_field_wrapper' => array(
				'background-color' => array( __('Background Color') , '#FFF' ),
				'border-color' => array( __('Border Color') , '#FFF' ),
			),
			'.fca_eoi_layout_2 .fca_eoi_layout_2_email_field_wrapper input, .fca_eoi_layout_2 .fca_eoi_layout_2_email_field_wrapper .fa' => array(
				'color' => array( __('Font Color') , '#000' ),
			),
		),

		// Added to the fieldset "Button"
		'button' => array(
			'.fca_eoi_layout_2 .fca_eoi_layout_2_submit_button_wrapper input' => array(
				'font-size' => array( __( 'Font Size' ), '16px' ),
				'color' => array( __('Font Color') , '#FFF' ),
				'background-color' => array( __('Background Color') , '#e84e34' ),
				'border-bottom-color' => array( __('Bottom Border Color') , '#c13a24' ),
			),
			'.fca_eoi_layout_2 .fca_eoi_layout_2_submit_button_wrapper input:hover' => array(
				'background-color' => array( __('Hover Color') , '#c13a24' ),
			),
		),
		'privacy' => array(
			'.fca_eoi_layout_2 .fca_eoi_layout_2_privacy_copy_wrapper' => array(
				'font-size' => array( __( 'Font Size' ), '12px' ),
				'color' => array( __('Font Color') , '#a1a1a1' ),
			),
		),
		'fatcatapps' => array(
			'.fca_eoi_layout_2 .fca_eoi_layout_2_fatcatapps_link_wrapper a, .fca_eoi_layout_2 .fca_eoi_layout_2_fatcatapps_link_wrapper a:hover' => array(
				'color' => array( __( 'Font Color' ), '#3197e1'),
			),
		),
	),

	'autocolors' => array(
		array(
			'source' => '[.fca_eoi_layout_2 .fca_eoi_layout_2_submit_button_wrapper input][background-color]',
			'destination' => '[.fca_eoi_layout_2 .fca_eoi_layout_2_submit_button_wrapper input][border-bottom-color]',
			'operations' => array(
				'spin' => '-0.2590233545647589',
				'desaturate' => '11.087065734049517',
				'darken' => '10.784313725490202',
			),
		),
		array(
			'source' => '[.fca_eoi_layout_2 .fca_eoi_layout_2_submit_button_wrapper input][background-color]',
			'destination' => '[.fca_eoi_layout_2 .fca_eoi_layout_2_submit_button_wrapper input:hover][background-color]',
			'operations' => array(
				'spin' => '-0.2590233545647589',
				'desaturate' => '11.087065734049517',
				'darken' => '10.784313725490202',
			),
		),
		array(
			'source' => '[.fca_eoi_layout_2 .ribbon][background-color]',
			'destination' => '[.fca_eoi_layout_2 .ribbon .ribbon-content:before, .fca_eoi_layout_2 .ribbon .ribbon-content:after][border-top-color]',
			'operations' => array(
				'spin' => '0.3541226215644713',
				'desaturate' => '11.029473156884029',
				'darken' => '13.921568627450975',
			),
		)
	),

	'texts' => array(
		'headline_copy' => 'Email Goodies',
		'description_copy' => 'Subscribe now and be the first to receive all the latest updates!',
		'name_placeholder' => 'Name',
		'email_placeholder' => 'Email',
		'button_copy' => 'Sign Up Now',
		'privacy_copy' => "100% Privacy. We don't spam.",
	),
);
