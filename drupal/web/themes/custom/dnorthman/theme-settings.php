<?php

declare(strict_types=1);

/**
 * @file
 * Theme settings form for dnorthman theme.
 */

use Drupal\Core\Form\FormState;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function dnorthman_form_system_theme_settings_alter(array &$form, FormState $form_state): void {

  $form['dnorthman'] = [
    '#type' => 'details',
    '#title' => t('dnorthman'),
    '#open' => TRUE,
  ];

  $form['dnorthman']['example'] = [
    '#type' => 'textfield',
    '#title' => t('Example'),
    '#default_value' => theme_get_setting('example'),
  ];

}
