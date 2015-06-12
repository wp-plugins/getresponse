<?php

function fca_eoi_layout_descriptor_2( $name, $layout_id, $texts ) {
	$layout = new EasyOptInsLayout( $layout_id );
	$class = $layout->layout_class;

	return array(

		'name' => __( $name ),

		'editables' => array(

			// Added to the fieldset "Form Background"
			'form' => array(
				'.fca_eoi_layout_2.' . $class => array(
					'background-color' => array( __( 'Form Background Color' ), 'eeeeee' ),
				),
			),

			// Added to the fieldset "Headline"
			'headline' => array(
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_headline_copy_wrapper div' => array(
					'font-weight' => array( '', 'bold' ),
					'font-style' => array( '', 'italic' ),
					'text-decoration' => array( '', 'underline' ),
					'font-size' => array( __( 'Font Size' ), '20px' ),
				),
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_headline_copy_wrapper' => array(
					'color' => array( __( 'Font Color' ), '#FFF' ),
					'background-color' => array( __( 'Background Color' ), '#3197e1' ),
				),
				'.fca_eoi_layout_2.' . $class . ' svg.fca_eoi_layout_fold' => array(
					'fill' => array( __( 'Fold Background Color' ), '#256fa6' ),
				),
			),

			// Added to the fieldset "Description"
			'description' => array(
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_description_copy_wrapper p, ' .
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_description_copy_wrapper div' => array(
					'font-size' => array( __( 'Font Size' ), '14px' ),
					'color' => array( __('Font Color') , '#000' ),
				),
			),

			// Added to the fieldset "Name"
			'name_field' => array(
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_name_field_wrapper' => array(
					'background-color' => array( __('Background Color') , '#FFF' ),
					'border-color' => array( __('Border Color') , '#FFF' ),
				),
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_name_field_wrapper input, ' .
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_name_field_wrapper i.fa' => array(
					'color' => array( __('Font Color') , '#000' ),
				),
			),

			// Added to the fieldset "Email"
			'email_field' => array(
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_email_field_wrapper' => array(
					'background-color' => array( __('Background Color') , '#FFF' ),
					'border-color' => array( __('Border Color') , '#FFF' ),
				),
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_email_field_wrapper input, ' .
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_email_field_wrapper i.fa' => array(
					'color' => array( __('Font Color') , '#000' ),
				),
			),

			// Added to the fieldset "Button"
			'button' => array(
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input' => array(
					'font-size' => array( __( 'Font Size' ), '16px' ),
					'color' => array( __('Font Color') , '#FFF' ),
					'background-color' => array( __('Background Color') , '#e84e34' ),
					'border-bottom-color' => array( __('Bottom Border Color') , '#c13a24' ),
				),
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input:hover' => array(
					'background-color' => array( __('Hover Color') , '#c13a24' ),
				),
			),

			// Added to the fieldset "Privacy Policy"
			'privacy' => array(
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_privacy_copy_wrapper div' => array(
					'font-size' => array( __( 'Font Size' ), '12px' ),
					'color' => array( __('Font Color') , '#a1a1a1' ),
				),
			),

			// Added to the fieldset "Branding"
			'fatcatapps' => array(
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_fatcatapps_link_wrapper a, ' .
				'.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_fatcatapps_link_wrapper a:hover' => array(
					'color' => array( __( 'Font Color' ), '#3197e1'),
				),
			),
		),

		'autocolors' => array(
			array(
				'source' => '[.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][background-color]',
				'destination' => '[.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][border-bottom-color]',
				'operations' => array(
					'spin' => '-0.2590233545647589',
					'desaturate' => '11.087065734049517',
					'darken' => '10.784313725490202',
				),
			),
			array(
				'source' => '[.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input][background-color]',
				'destination' => '[.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_submit_button_wrapper input:hover][background-color]',
				'operations' => array(
					'spin' => '-0.2590233545647589',
					'desaturate' => '11.087065734049517',
					'darken' => '10.784313725490202',
				),
			),
			array(
				'source' => '[.fca_eoi_layout_2.' . $class . ' div.fca_eoi_layout_headline_copy_wrapper][background-color]',
				'destination' => '[.fca_eoi_layout_2.' . $class . ' svg.fca_eoi_layout_fold][fill]',
				'operations' => array(
					'spin' => '0.3541226215644713',
					'desaturate' => '11.029473156884029',
					'darken' => '13.921568627450975',
				),
			)
		),

		'texts' => $texts
	);
}