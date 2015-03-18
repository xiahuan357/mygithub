package com.my.hadoop.count;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class Count {
	
	public static class TokenizerMapper extends
			Mapper<Object, Text, Text, Text> {
		private Integer timeh;
		private Integer timem;
		private Text channel = new Text();
		private Text program = new Text();
		private String summary = "";
		private String	time1= "";
		private String	time2= "";
		public void map(Object key, Text value, Context context)
				throws IOException, InterruptedException {
			
	
			StringTokenizer itr = new StringTokenizer(value.toString());
			StringTokenizer time = new StringTokenizer(itr.nextToken()
					.toString(), ":");
			try {
				while (time.hasMoreTokens()) {
					timeh = Integer.parseInt(time.nextToken());
					timem = Integer.parseInt(time.nextToken());
				}
			} catch (Exception ex) {
				System.out.println(ex);

			}

			while (itr.hasMoreTokens()) {

				// if(timeh[i]!=timeh[i-1]&&timem[i]<=30)
				channel.set(itr.nextToken());
				program.set(itr.nextToken());
				// word1=word+itr.nextToken();
				// word.set(itr.nextToken());
				// if(timeh[i]!=timeh[i-1]&&timem[i]>30)
				// word2=word+”,”+itr;
				// i =i+1;
             time1 = timeh.toString() + ":00—" + timeh.toString() + ":30";
             time2 = timeh.toString() + ":30—"+ (Integer.valueOf(timeh + 1)).toString() + ":00";
		
				summary = channel.toString() + program.toString();
				if (timem <= 30) {
					context.write(new Text(time1),
							new Text(summary));
				
				} else {
					context.write(
							new Text(time2 ),
							new Text(summary));
					
				}
				

			}

		}
	}

	public static class Reduce extends Reducer<Text, Text, Text, Text> {
	
		public void reduce(Text key, Iterable<Text> values, Context context)
				throws IOException, InterruptedException {
			
			 String summaryadd="";
			
			try {
				Map<String, Integer> map = new HashMap<String, Integer>();
				
				for (Text str : values) {
					if (map.containsKey(str.toString())) {
						map.put(str.toString(), map.get(str.toString()) + 1);
					} else {
						map.put(str.toString(),1);
					}
					System.out.println(str.toString());
				}
				
				for (Entry<String, Integer> entry : map.entrySet()) {
					System.out.println("wite----");
					summaryadd =summaryadd+"  "+entry.getKey().toString()
							+ "*"+entry.getValue().toString() ;
				
				}
				
				context.write(key, new Text(summaryadd));
			} catch (Exception ex) {
				System.out.println(ex);
			}
		}
	}

	public static void main(String[] args) throws Exception {
		Configuration conf = new Configuration();
		String[] otherArgs = new GenericOptionsParser(conf, args)
				.getRemainingArgs();
		if (otherArgs.length != 2) {
			System.err.println("Usage:count <in> <out>");
			System.exit(2);
		}
		@SuppressWarnings("deprecation")
		Job job = new Job(conf, "count");
		Path in = new Path(otherArgs[0]);
		Path out = new Path(otherArgs[1]);
		FileInputFormat.addInputPath(job, in);
		FileOutputFormat.setOutputPath(job, out);
		job.setJarByClass(Count.class);
		job.setMapperClass(TokenizerMapper.class);
		job.setReducerClass(Reduce.class);
	
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);
		
		System.exit(job.waitForCompletion(true) ? 0 : 1);

	}
}
