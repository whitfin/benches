inputs = %{
  "Small (100)"   => :crypto.strong_rand_bytes(100),
  "Middle (1000)" => :crypto.strong_rand_bytes(1_000),
  "Big (10000)"   => :crypto.strong_rand_bytes(10_000),
}

tests = %{
  "base16" => &Base.encode16/1,
  "base32" => &Base.encode32/1,
  "base64" => &Base.encode64/1
}

Benchee.run(tests, [ time: 15, warmup: 5, inputs: inputs ])
