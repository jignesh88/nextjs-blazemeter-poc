#!/usr/bin/env python3

import os
import sys
import json
import glob
from datetime import datetime

def extract_performance_data(results_dir):
    """Extract performance data from JTL files."""
    data = {}
    
    # Find all JTL files
    jtl_files = glob.glob(os.path.join(results_dir, "*.jtl"))
    
    for jtl_file in jtl_files:
        test_name = os.path.basename(jtl_file).replace(".jtl", "")
        data[test_name] = {
            "avg_response_time": 0,
            "p90_response_time": 0,
            "error_rate": 0,
            "throughput": 0,
            "requests": [],
            "timestamps": [],
            "response_times": []
        }
        
        response_times = []
        success_count = 0
        error_count = 0
        
        # Process JTL file
        with open(jtl_file, 'r') as f:
            # Skip header
            header = f.readline().strip().split(',')
            timestamp_idx = header.index("timeStamp") if "timeStamp" in header else 0
            elapsed_idx = header.index("elapsed") if "elapsed" in header else 1
            success_idx = header.index("success") if "success" in header else 7
            label_idx = header.index("label") if "label" in header else 2
            
            for line in f:
                parts = line.strip().split(',')
                if len(parts) <= max(timestamp_idx, elapsed_idx, success_idx, label_idx):
                    continue
                
                timestamp = int(parts[timestamp_idx])
                elapsed = int(parts[elapsed_idx])
                success = parts[success_idx].lower() == 'true'
                label = parts[label_idx]
                
                # Add to data
                data[test_name]["requests"].append(label)
                data[test_name]["timestamps"].append(timestamp)
                data[test_name]["response_times"].append(elapsed)
                
                response_times.append(elapsed)
                if success:
                    success_count += 1
                else:
                    error_count += 1
        
        # Calculate metrics
        if response_times:
            data[test_name]["avg_response_time"] = sum(response_times) / len(response_times)
            response_times.sort()
            p90_index = int(len(response_times) * 0.9)
            data[test_name]["p90_response_time"] = response_times[p90_index]
        
        total_requests = success_count + error_count
        if total_requests > 0:
            data[test_name]["error_rate"] = (error_count / total_requests) * 100
            test_duration_seconds = (max(data[test_name]["timestamps"]) - min(data[test_name]["timestamps"])) / 1000 if data[test_name]["timestamps"] else 1
            data[test_name]["throughput"] = total_requests / test_duration_seconds
    
    return data

def generate_html_report(data, output_dir):
    """Generate HTML report."""
    template_str = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Performance Test Report</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                color: #333;
            }
            h1, h2, h3 {
                color: #2c3e50;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
            }
            .summary {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            .test-results {
                margin-bottom: 30px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            th, td {
                padding: 12px 15px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            tr:hover {
                background-color: #f5f5f5;
            }
            .pass {
                color: green;
                font-weight: bold;
            }
            .fail {
                color: red;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Performance Test Report</h1>
            <div class="summary">
                <h2>Summary</h2>
                <p><strong>Date:</strong> {{date}}</p>
                <p><strong>Total Tests:</strong> {{total_tests}}</p>
                <p><strong>Passed:</strong> {{passed_tests}}</p>
                <p><strong>Failed:</strong> {{failed_tests}}</p>
            </div>
            
            <div class="test-results">
                <h2>Test Results</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Avg Response Time (ms)</th>
                            <th>P90 Response Time (ms)</th>
                            <th>Error Rate (%)</th>
                            <th>Throughput (req/s)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{table_rows}}
                    </tbody>
                </table>
            </div>
        </div>
    </body>
    </html>
    '''
    
    # Count passed and failed tests
    passed_tests = 0
    failed_tests = 0
    table_rows = ""
    
    for test_name, test_data in data.items():
        status = "PASS" if test_data["error_rate"] < 5 and test_data["avg_response_time"] < 2000 else "FAIL"
        status_class = "pass" if status == "PASS" else "fail"
        
        if status == "PASS":
            passed_tests += 1
        else:
            failed_tests += 1
        
        table_rows += f'''
        <tr>
            <td>{test_name}</td>
            <td>{test_data["avg_response_time"]:.2f}</td>
            <td>{test_data["p90_response_time"]:.2f}</td>
            <td>{test_data["error_rate"]:.2f}</td>
            <td>{test_data["throughput"]:.2f}</td>
            <td class="{status_class}">{status}</td>
        </tr>
        '''
    
    # Replace placeholders in template
    html_content = template_str.replace("{{date}}", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    html_content = html_content.replace("{{total_tests}}", str(len(data)))
    html_content = html_content.replace("{{passed_tests}}", str(passed_tests))
    html_content = html_content.replace("{{failed_tests}}", str(failed_tests))
    html_content = html_content.replace("{{table_rows}}", table_rows)
    
    # Write to file
    os.makedirs(output_dir, exist_ok=True)
    with open(os.path.join(output_dir, "report.html"), 'w') as f:
        f.write(html_content)

def main(results_dir):
    """Main function to generate the report."""
    # Create output directory
    output_dir = os.path.join(os.path.dirname(results_dir), "report")
    os.makedirs(output_dir, exist_ok=True)
    
    # Extract performance data
    data = extract_performance_data(results_dir)
    
    # Generate HTML report
    generate_html_report(data, output_dir)
    
    print(f"Report generated in {output_dir}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate-report.py <results_directory>")
        sys.exit(1)
    
    main(sys.argv[1])
