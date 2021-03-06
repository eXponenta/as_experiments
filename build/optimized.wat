(module
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $i32_i32_i32_i32_i32_i32_=>_i32 (func (param i32 i32 i32 i32 i32 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (memory $0 1)
 (data (i32.const 1024) "(\00\00\00\01\00\00\00\01\00\00\00(\00\00\00a\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data (i32.const 1088) "\1e\00\00\00\01\00\00\00\01\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data (i32.const 1136) "\10\00\00\00\01\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\ff\ff\ff\ff")
 (data (i32.const 1168) "\10\00\00\00\01\00\00\00\03\00\00\00\10\00\00\00\80\04\00\00\80\04\00\00\10\00\00\00\04")
 (data (i32.const 1200) "\10\00\00\00\01\00\00\00\00\00\00\00\10\00\00\00\ff\ff\ff\ff\00\00\00\00\01")
 (data (i32.const 1232) "\10\00\00\00\01\00\00\00\03\00\00\00\10\00\00\00\c0\04\00\00\c0\04\00\00\10\00\00\00\04")
 (data (i32.const 1264) "\1c\00\00\00\01\00\00\00\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data (i32.const 1312) "\1a\00\00\00\01\00\00\00\01\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1360) "$\00\00\00\01\00\00\00\01\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data (i32.const 1424) "$\00\00\00\01\00\00\00\01\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 1488) "\05\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00\"\01\00\00\00\00\00\00!\01\00\00\02")
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $assembly/index/Uint32Array_ID i32 (i32.const 4))
 (global $assembly/index/stack (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 1488))
 (export "memory" (memory $0))
 (export "__alloc" (func $~lib/rt/tlsf/__alloc))
 (export "__retain" (func $~lib/rt/pure/__retain))
 (export "__release" (func $~lib/rt/pure/__release))
 (export "__collect" (func $~lib/rt/pure/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "Uint32Array_ID" (global $assembly/index/Uint32Array_ID))
 (export "floodFill" (func $assembly/index/floodFill))
 (start $~start)
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  i32.const -4
  i32.and
  local.tee $2
  i32.const 256
  i32.lt_u
  if
   local.get $2
   i32.const 4
   i32.shr_u
   local.set $3
  else
   local.get $2
   i32.const 31
   local.get $2
   i32.clz
   i32.sub
   local.tee $2
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
   local.set $3
   local.get $2
   i32.const 7
   i32.sub
   local.set $4
  end
  local.get $1
  i32.load offset=20
  local.set $2
  local.get $1
  i32.load offset=16
  local.tee $5
  if
   local.get $5
   local.get $2
   i32.store offset=20
  end
  local.get $2
  if
   local.get $2
   local.get $5
   i32.store offset=16
  end
  local.get $1
  local.get $0
  local.get $3
  local.get $4
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  i32.eq
  if
   local.get $0
   local.get $3
   local.get $4
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   local.get $2
   i32.store offset=96
   local.get $2
   i32.eqz
   if
    local.get $0
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    local.tee $2
    i32.load offset=4
    i32.const 1
    local.get $3
    i32.shl
    i32.const -1
    i32.xor
    i32.and
    local.set $1
    local.get $2
    local.get $1
    i32.store offset=4
    local.get $1
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const 1
     local.get $4
     i32.shl
     i32.const -1
     i32.xor
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $1
  i32.load
  local.set $4
  local.get $1
  i32.const 16
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $5
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $4
   i32.const -4
   i32.and
   i32.const 16
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.const 1073741808
   i32.lt_u
   if
    local.get $0
    local.get $5
    call $~lib/rt/tlsf/removeBlock
    local.get $1
    local.get $3
    local.get $4
    i32.const 3
    i32.and
    i32.or
    local.tee $4
    i32.store
    local.get $1
    i32.const 16
    i32.add
    local.get $1
    i32.load
    i32.const -4
    i32.and
    i32.add
    local.tee $5
    i32.load
    local.set $2
   end
  end
  local.get $4
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $3
   i32.load
   local.tee $7
   i32.const -4
   i32.and
   i32.const 16
   i32.add
   local.get $4
   i32.const -4
   i32.and
   i32.add
   local.tee $8
   i32.const 1073741808
   i32.lt_u
   if
    local.get $0
    local.get $3
    call $~lib/rt/tlsf/removeBlock
    local.get $3
    local.get $8
    local.get $7
    i32.const 3
    i32.and
    i32.or
    local.tee $4
    i32.store
    local.get $3
    local.set $1
   end
  end
  local.get $5
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $5
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $4
  i32.const -4
  i32.and
  local.tee $3
  i32.const 256
  i32.lt_u
  if
   local.get $3
   i32.const 4
   i32.shr_u
   local.set $3
  else
   local.get $3
   i32.const 31
   local.get $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
   local.set $3
   local.get $4
   i32.const 7
   i32.sub
   local.set $6
  end
  local.get $0
  local.get $3
  local.get $6
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $4
  local.get $1
  i32.const 0
  i32.store offset=16
  local.get $1
  local.get $4
  i32.store offset=20
  local.get $4
  if
   local.get $4
   local.get $1
   i32.store offset=16
  end
  local.get $0
  local.get $3
  local.get $6
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $6
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $6
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $3
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $2
  local.get $0
  i32.load offset=1568
  local.tee $2
  if
   local.get $2
   local.get $1
   i32.const 16
   i32.sub
   i32.eq
   if
    local.get $2
    i32.load
    local.set $3
    local.get $1
    i32.const 16
    i32.sub
    local.set $1
   end
  end
  local.get $1
  i32.sub
  local.tee $2
  i32.const 48
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $3
  i32.const 2
  i32.and
  local.get $2
  i32.const 32
  i32.sub
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=16
  local.get $1
  i32.const 0
  i32.store offset=20
  local.get $1
  local.get $2
  i32.add
  i32.const 16
  i32.sub
  local.tee $2
  i32.const 2
  i32.store
  local.get $0
  local.get $2
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/maybeInitialize (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/rt/tlsf/ROOT
  local.tee $0
  i32.eqz
  if
   i32.const 1
   memory.size
   local.tee $0
   i32.gt_s
   if (result i32)
    i32.const 1
    local.get $0
    i32.sub
    memory.grow
    i32.const 0
    i32.lt_s
   else
    i32.const 0
   end
   if
    unreachable
   end
   i32.const 1536
   local.tee $0
   i32.const 0
   i32.store
   i32.const 3104
   i32.const 0
   i32.store
   loop $for-loop|0
    local.get $1
    i32.const 23
    i32.lt_u
    if
     local.get $1
     i32.const 2
     i32.shl
     i32.const 1536
     i32.add
     i32.const 0
     i32.store offset=4
     i32.const 0
     local.set $2
     loop $for-loop|1
      local.get $2
      i32.const 16
      i32.lt_u
      if
       local.get $1
       i32.const 4
       i32.shl
       local.get $2
       i32.add
       i32.const 2
       i32.shl
       i32.const 1536
       i32.add
       i32.const 0
       i32.store offset=96
       local.get $2
       i32.const 1
       i32.add
       local.set $2
       br $for-loop|1
      end
     end
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   i32.const 1536
   i32.const 3120
   memory.size
   i32.const 16
   i32.shl
   call $~lib/rt/tlsf/addMemory
   i32.const 1536
   global.set $~lib/rt/tlsf/ROOT
  end
  local.get $0
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if
   local.get $1
   i32.const 4
   i32.shr_u
   local.set $1
  else
   local.get $1
   i32.const 536870904
   i32.lt_u
   if
    local.get $1
    i32.const 1
    i32.const 27
    local.get $1
    i32.clz
    i32.sub
    i32.shl
    i32.add
    i32.const 1
    i32.sub
    local.set $1
   end
   local.get $1
   i32.const 31
   local.get $1
   i32.clz
   i32.sub
   local.tee $2
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
   local.set $1
   local.get $2
   i32.const 7
   i32.sub
   local.set $2
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  local.tee $4
  i32.const 1073741808
  i32.ge_u
  if
   i32.const 1040
   i32.const 1104
   i32.const 461
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $4
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $1
  i32.const 16
  local.get $1
  i32.const 16
  i32.gt_u
  select
  local.tee $1
  call $~lib/rt/tlsf/searchBlock
  local.tee $3
  i32.eqz
  if
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/searchBlock
   local.tee $3
   i32.eqz
   if
    local.get $1
    i32.const 536870904
    i32.lt_u
    if (result i32)
     local.get $1
     i32.const 1
     i32.const 27
     local.get $1
     i32.clz
     i32.sub
     i32.shl
     i32.const 1
     i32.sub
     i32.add
    else
     local.get $1
    end
    i32.const 16
    memory.size
    local.tee $3
    i32.const 16
    i32.shl
    i32.const 16
    i32.sub
    local.get $0
    i32.load offset=1568
    i32.ne
    i32.shl
    i32.add
    i32.const 65535
    i32.add
    i32.const -65536
    i32.and
    i32.const 16
    i32.shr_u
    local.set $5
    local.get $3
    local.get $5
    local.get $3
    local.get $5
    i32.gt_s
    select
    memory.grow
    i32.const 0
    i32.lt_s
    if
     local.get $5
     memory.grow
     i32.const 0
     i32.lt_s
     if
      unreachable
     end
    end
    local.get $0
    local.get $3
    i32.const 16
    i32.shl
    memory.size
    i32.const 16
    i32.shl
    call $~lib/rt/tlsf/addMemory
    local.get $0
    local.get $1
    call $~lib/rt/tlsf/searchBlock
    local.set $3
   end
  end
  local.get $3
  i32.load
  drop
  local.get $3
  i32.const 0
  i32.store offset=4
  local.get $3
  local.get $2
  i32.store offset=8
  local.get $3
  local.get $4
  i32.store offset=12
  local.get $0
  local.get $3
  call $~lib/rt/tlsf/removeBlock
  local.get $3
  i32.load
  local.tee $2
  i32.const -4
  i32.and
  local.get $1
  i32.sub
  local.tee $4
  i32.const 32
  i32.ge_u
  if
   local.get $3
   local.get $1
   local.get $2
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $1
   local.get $3
   i32.const 16
   i32.add
   i32.add
   local.tee $1
   local.get $4
   i32.const 16
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $3
   local.get $2
   i32.const -2
   i32.and
   i32.store
   local.get $3
   i32.const 16
   i32.add
   local.tee $0
   local.get $3
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.get $0
   local.get $3
   i32.load
   i32.const -4
   i32.and
   i32.add
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $3
 )
 (func $~lib/rt/tlsf/__alloc (param $0 i32) (param $1 i32) (result i32)
  call $~lib/rt/tlsf/maybeInitialize
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/allocateBlock
  i32.const 16
  i32.add
 )
 (func $~lib/rt/pure/__retain (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.const 1532
  i32.gt_u
  if
   local.get $0
   i32.const 16
   i32.sub
   local.tee $1
   i32.load offset=4
   local.set $2
   local.get $1
   local.get $2
   i32.const 1
   i32.add
   i32.store offset=4
   local.get $1
   i32.load
   drop
  end
  local.get $0
 )
 (func $~lib/rt/pure/__release (param $0 i32)
  local.get $0
  i32.const 1532
  i32.gt_u
  if
   local.get $0
   i32.const 16
   i32.sub
   call $~lib/rt/pure/decrement
  end
 )
 (func $~lib/memory/memory.fill (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store8
   local.get $0
   i32.const 28
   i32.add
   i32.const 0
   i32.store8 offset=3
   local.get $0
   i32.const 0
   i32.store8 offset=1
   local.get $0
   i32.const 0
   i32.store8 offset=2
   local.get $0
   i32.const 0
   i32.store8 offset=30
   local.get $0
   i32.const 0
   i32.store8 offset=29
   local.get $0
   i32.const 0
   i32.store8 offset=3
   local.get $0
   i32.const 0
   i32.store8 offset=28
   local.get $0
   i32.const 0
   local.get $0
   i32.sub
   i32.const 3
   i32.and
   local.tee $1
   i32.add
   local.tee $0
   i32.const 0
   i32.store
   local.get $0
   i32.const 32
   local.get $1
   i32.sub
   i32.const -4
   i32.and
   local.tee $2
   i32.add
   i32.const 28
   i32.sub
   local.tee $1
   i32.const 0
   i32.store offset=24
   local.get $2
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $1
   i32.const 0
   i32.store offset=20
   local.get $2
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.const 0
   i32.store offset=12
   local.get $0
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.const 0
   i32.store offset=20
   local.get $0
   i32.const 0
   i32.store offset=24
   local.get $1
   i32.const 0
   i32.store
   local.get $1
   i32.const 0
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=12
   local.get $0
   local.get $0
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $1
   i32.add
   local.set $0
   local.get $2
   local.get $1
   i32.sub
   local.set $1
   loop $while-continue|0
    local.get $1
    i32.const 32
    i32.ge_u
    if
     local.get $0
     i64.const 0
     i64.store
     local.get $0
     i64.const 0
     i64.store offset=8
     local.get $0
     i64.const 0
     i64.store offset=16
     local.get $0
     i64.const 0
     i64.store offset=24
     local.get $1
     i32.const 32
     i32.sub
     local.set $1
     local.get $0
     i32.const 32
     i32.add
     local.set $0
     br $while-continue|0
    end
   end
  end
 )
 (func $~lib/array/Array<u32>#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  call $~lib/rt/tlsf/maybeInitialize
  i32.const 16
  i32.const 3
  call $~lib/rt/tlsf/allocateBlock
  i32.const 16
  i32.add
  local.tee $0
  i32.const 1532
  i32.gt_u
  if
   local.get $0
   i32.const 16
   i32.sub
   local.tee $2
   i32.load offset=4
   local.set $1
   local.get $2
   local.get $1
   i32.const 1
   i32.add
   i32.store offset=4
   local.get $2
   i32.load
   drop
  end
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 0
  i32.store offset=12
  call $~lib/rt/tlsf/maybeInitialize
  i32.const 32
  i32.const 0
  call $~lib/rt/tlsf/allocateBlock
  i32.const 16
  i32.add
  local.tee $1
  call $~lib/memory/memory.fill
  local.get $0
  i32.load
  local.tee $2
  local.get $1
  i32.ne
  if
   local.get $1
   i32.const 1532
   i32.gt_u
   if
    local.get $1
    i32.const 16
    i32.sub
    local.tee $3
    i32.load offset=4
    local.set $4
    local.get $3
    local.get $4
    i32.const 1
    i32.add
    i32.store offset=4
    local.get $3
    i32.load
    drop
   end
   local.get $2
   i32.const 1532
   i32.gt_u
   if
    local.get $2
    i32.const 16
    i32.sub
    call $~lib/rt/pure/decrement
   end
  end
  local.get $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 32
  i32.store offset=8
  local.get $0
  i32.const 8
  i32.store offset=12
  local.get $0
 )
 (func $assembly/index/floodFill (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32) (param $5 i32) (result i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  local.get $5
  i32.const 1532
  i32.gt_u
  if
   local.get $5
   i32.const 16
   i32.sub
   local.tee $7
   local.get $7
   i32.load offset=4
   i32.const 1
   i32.add
   i32.store offset=4
   local.get $7
   i32.load
   drop
  end
  local.get $5
  i32.load offset=4
  local.get $0
  local.get $1
  local.get $3
  i32.mul
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $9
  global.get $assembly/index/stack
  local.tee $6
  i32.load offset=4
  local.get $0
  i32.store
  i32.const 2
  local.set $7
  local.get $6
  i32.load offset=4
  local.get $1
  i32.store offset=4
  loop $while-continue|0
   local.get $7
   i32.const 0
   i32.gt_u
   if
    global.get $assembly/index/stack
    local.tee $1
    i32.load offset=4
    local.get $7
    i32.const 1
    i32.sub
    local.tee $6
    i32.const 1
    i32.sub
    local.tee $7
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $0
    local.get $3
    local.get $1
    i32.load offset=4
    local.get $6
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $1
    i32.mul
    i32.add
    local.tee $6
    local.get $5
    i32.load offset=8
    i32.const 2
    i32.shr_u
    i32.ge_u
    if
     i32.const 1376
     i32.const 1440
     i32.const 803
     i32.const 64
     call $~lib/builtins/abort
     unreachable
    end
    local.get $5
    i32.load offset=4
    local.get $6
    i32.const 2
    i32.shl
    i32.add
    local.get $2
    i32.store
    local.get $11
    i32.const 1
    i32.add
    local.set $11
    local.get $1
    i32.const 1
    i32.sub
    local.tee $6
    local.get $4
    i32.lt_u
    i32.const 0
    local.get $0
    local.get $3
    i32.lt_u
    i32.const 0
    local.get $6
    i32.const 0
    i32.ge_u
    i32.const 0
    local.get $0
    i32.const 0
    i32.ge_u
    select
    select
    select
    if
     local.get $9
     local.get $5
     i32.load offset=4
     local.get $0
     local.get $3
     local.get $6
     i32.mul
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.eq
     if
      global.get $assembly/index/stack
      local.tee $8
      i32.load offset=4
      local.get $7
      i32.const 2
      i32.shl
      i32.add
      local.get $0
      i32.store
      local.get $7
      i32.const 1
      i32.add
      local.tee $10
      i32.const 1
      i32.add
      local.set $7
      local.get $8
      i32.load offset=4
      local.get $10
      i32.const 2
      i32.shl
      i32.add
      local.get $6
      i32.store
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.tee $6
    i32.const 0
    i32.ge_u
    if (result i32)
     local.get $1
     i32.const 0
     i32.ge_u
    else
     i32.const 0
    end
    if (result i32)
     local.get $6
     local.get $3
     i32.lt_u
    else
     i32.const 0
    end
    if (result i32)
     local.get $1
     local.get $4
     i32.lt_u
    else
     i32.const 0
    end
    if
     local.get $9
     local.get $5
     i32.load offset=4
     local.get $6
     local.get $1
     local.get $3
     i32.mul
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.eq
     if
      global.get $assembly/index/stack
      local.tee $8
      i32.load offset=4
      local.get $7
      i32.const 2
      i32.shl
      i32.add
      local.get $6
      i32.store
      local.get $7
      i32.const 1
      i32.add
      local.tee $6
      i32.const 1
      i32.add
      local.set $7
      local.get $8
      i32.load offset=4
      local.get $6
      i32.const 2
      i32.shl
      i32.add
      local.get $1
      i32.store
     end
    end
    local.get $1
    i32.const 1
    i32.add
    local.tee $6
    local.get $4
    i32.lt_u
    i32.const 0
    local.get $0
    local.get $3
    i32.lt_u
    i32.const 0
    local.get $6
    i32.const 0
    i32.ge_u
    i32.const 0
    local.get $0
    i32.const 0
    i32.ge_u
    select
    select
    select
    if
     local.get $9
     local.get $5
     i32.load offset=4
     local.get $0
     local.get $3
     local.get $6
     i32.mul
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.eq
     if
      global.get $assembly/index/stack
      local.tee $8
      i32.load offset=4
      local.get $7
      i32.const 2
      i32.shl
      i32.add
      local.get $0
      i32.store
      local.get $7
      i32.const 1
      i32.add
      local.tee $10
      i32.const 1
      i32.add
      local.set $7
      local.get $8
      i32.load offset=4
      local.get $10
      i32.const 2
      i32.shl
      i32.add
      local.get $6
      i32.store
     end
    end
    local.get $0
    i32.const 1
    i32.sub
    local.tee $0
    i32.const 0
    i32.ge_u
    if (result i32)
     local.get $1
     i32.const 0
     i32.ge_u
    else
     i32.const 0
    end
    if (result i32)
     local.get $0
     local.get $3
     i32.lt_u
    else
     i32.const 0
    end
    if (result i32)
     local.get $1
     local.get $4
     i32.lt_u
    else
     i32.const 0
    end
    if
     local.get $9
     local.get $5
     i32.load offset=4
     local.get $0
     local.get $1
     local.get $3
     i32.mul
     i32.add
     i32.const 2
     i32.shl
     i32.add
     i32.load
     i32.eq
     if
      global.get $assembly/index/stack
      local.tee $6
      i32.load offset=4
      local.get $7
      i32.const 2
      i32.shl
      i32.add
      local.get $0
      i32.store
      local.get $7
      i32.const 1
      i32.add
      local.tee $0
      i32.const 1
      i32.add
      local.set $7
      local.get $6
      i32.load offset=4
      local.get $0
      i32.const 2
      i32.shl
      i32.add
      local.get $1
      i32.store
     end
    end
    br $while-continue|0
   end
  end
  local.get $5
  i32.const 1532
  i32.gt_u
  if
   local.get $5
   i32.const 16
   i32.sub
   call $~lib/rt/pure/decrement
  end
  local.get $11
 )
 (func $~start
  call $~lib/array/Array<u32>#constructor
  global.set $assembly/index/stack
 )
 (func $~lib/rt/pure/__collect
  nop
 )
 (func $~lib/rt/pure/decrement (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.load
  drop
  local.get $0
  i32.load offset=4
  local.tee $1
  i32.const 268435455
  i32.and
  local.tee $2
  i32.const 1
  i32.eq
  if
   block $__inlined_func$~lib/rt/__visit_members
    block $switch$1$default
     block $switch$1$case$5
      block $switch$1$case$4
       local.get $0
       i32.const 8
       i32.add
       i32.load
       br_table $__inlined_func$~lib/rt/__visit_members $__inlined_func$~lib/rt/__visit_members $switch$1$case$4 $switch$1$case$5 $switch$1$case$4 $switch$1$default
      end
      local.get $0
      i32.load offset=16
      local.tee $1
      if
       local.get $1
       i32.const 1532
       i32.ge_u
       if
        local.get $1
        i32.const 16
        i32.sub
        call $~lib/rt/pure/decrement
       end
      end
      br $__inlined_func$~lib/rt/__visit_members
     end
     local.get $0
     i32.load offset=16
     local.tee $1
     i32.const 1532
     i32.ge_u
     if
      local.get $1
      i32.const 16
      i32.sub
      call $~lib/rt/pure/decrement
     end
     br $__inlined_func$~lib/rt/__visit_members
    end
    unreachable
   end
   local.get $0
   local.get $0
   i32.load
   i32.const 1
   i32.or
   i32.store
   global.get $~lib/rt/tlsf/ROOT
   local.get $0
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $0
   local.get $2
   i32.const 1
   i32.sub
   local.get $1
   i32.const -268435456
   i32.and
   i32.or
   i32.store offset=4
  end
 )
)
