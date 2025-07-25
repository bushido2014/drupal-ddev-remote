<?php

declare(strict_types=1);

namespace Drupal\Tests\Core\Test;

use Drupal\Core\Test\PhpUnitTestRunner;
use Drupal\Core\Test\SimpletestTestRunResultsStorage;
use Drupal\Core\Test\TestRun;
use Drupal\Core\Test\TestStatus;
use Drupal\Tests\UnitTestCase;

/**
 * @coversDefaultClass \Drupal\Core\Test\PhpUnitTestRunner
 * @group Test
 *
 * @see Drupal\Tests\simpletest\Unit\SimpletestPhpunitRunCommandTest
 */
class PhpUnitTestRunnerTest extends UnitTestCase {

  /**
   * Tests an error in the test running phase.
   *
   * @covers ::execute
   */
  public function testRunTestsError(): void {
    $test_id = 23;
    $log_path = 'test_log_path';

    // Create a mock test run storage.
    $storage = $this->getMockBuilder(SimpletestTestRunResultsStorage::class)
      ->disableOriginalConstructor()
      ->onlyMethods(['createNew'])
      ->getMock();

    // Set some expectations for createNew().
    $storage->expects($this->once())
      ->method('createNew')
      ->willReturn($test_id);

    // Create a mock runner.
    $runner = $this->getMockBuilder(PhpUnitTestRunner::class)
      ->disableOriginalConstructor()
      ->onlyMethods(['xmlLogFilepath', 'runCommand'])
      ->getMock();

    // Set some expectations for xmlLogFilepath().
    $runner->expects($this->once())
      ->method('xmlLogFilepath')
      ->willReturn($log_path);

    // We mark a failure by having runCommand() deliver a serious status code.
    $runner->expects($this->once())
      ->method('runCommand')
      ->willReturnCallback(
        function (string $test_class_name, string $log_junit_file_path, int &$status, array &$output): void {
          $status = TestStatus::SYSTEM;
          $output = ['A most serious error occurred.'];
        }
      );

    // The execute() method expects $status by reference, so we initialize it
    // to some value we don't expect back.
    $status = -1;
    $test_run = TestRun::createNew($storage);
    $results = $runner->execute($test_run, 'SomeTest', $status);

    // Make sure our status code made the round trip.
    $this->assertEquals(TestStatus::SYSTEM, $status);

    // A serious error in runCommand() should give us a fixed set of results.
    $row = reset($results);
    unset($row['time']);
    $fail_row = [
      'test_id' => $test_id,
      'test_class' => 'SomeTest',
      'status' => TestStatus::label(TestStatus::SYSTEM),
      'message' => 'A most serious error occurred.',
      'message_group' => 'Other',
      'function' => '*** Process execution output ***',
      'line' => '0',
      'file' => $log_path,
    ];
    $this->assertEquals($fail_row, $row);
  }

  /**
   * @covers ::phpUnitCommand
   */
  public function testPhpUnitCommand(): void {
    $runner = new PhpUnitTestRunner($this->root, sys_get_temp_dir());
    $this->assertMatchesRegularExpression('/phpunit/', $runner->phpUnitCommand());
  }

  /**
   * @covers ::xmlLogFilePath
   */
  public function testXmlLogFilePath(): void {
    $runner = new PhpUnitTestRunner($this->root, sys_get_temp_dir());
    $this->assertStringEndsWith('phpunit-23.xml', $runner->xmlLogFilePath(23));
  }

  public static function providerTestSummarizeResults() {
    return [
      [
        [
          [
            'test_class' => static::class,
            'status' => 'pass',
            'time' => 0.010001,
          ],
        ],
        '#pass',
      ],
      [
        [
          [
            'test_class' => static::class,
            'status' => 'fail',
            'time' => 0.010002,
          ],
        ],
        '#fail',
      ],
      [
        [
          [
            'test_class' => static::class,
            'status' => 'exception',
            'time' => 0.010003,
          ],
        ],
        '#exception',
      ],
      [
        [
          [
            'test_class' => static::class,
            'status' => 'debug',
            'time' => 0.010004,
          ],
        ],
        '#debug',
      ],
    ];
  }

  /**
   * @dataProvider providerTestSummarizeResults
   * @covers ::summarizeResults
   */
  public function testSummarizeResults($results, $has_status): void {
    $runner = new PhpUnitTestRunner($this->root, sys_get_temp_dir());
    $summary = $runner->summarizeResults($results);

    $this->assertArrayHasKey(static::class, $summary);
    $this->assertEquals(1, $summary[static::class][$has_status]);
    foreach (array_diff(['#pass', '#fail', '#exception', '#debug'], [$has_status]) as $should_be_zero) {
      $this->assertSame(0, $summary[static::class][$should_be_zero]);
    }
  }

}
